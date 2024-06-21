import {
  useState,
  useEffect,
  useReducer,
  useCallback,
} from 'react';

import {
  IValidator,
  FormFieldValue,
  ValidationErrors,
} from '../types';

import useValidation from './useValidation'

import {
  noop,
  isEmpty,
} from '@shared/lib/utils/Utils';

import * as objectMutationUtils from '@shared/lib/utils/ObjectMutationUtils'

const {
  getProperty,
  setProperty,
} = objectMutationUtils;

type TValidator<Data, Errors extends ValidationErrors> = IValidator<Data, Errors>;

enum ActionType {
  CLEAR = 'CLEAR',
  CLEAR_FIELD = 'CLEAR_FIELD',
  CLEAR_FIELDS = 'CLEAR_FIELDS',
  CHANGE_FIELD = 'CHANGE_FIELD',
  CHANGE_FIELDS = 'CHANGE_FIELDS',
}

type TEvent = { type: string };

type Action =
  | { type: ActionType.CLEAR }
  | { type: ActionType.CLEAR_FIELD, payload: { name: string } }
  | { type: ActionType.CLEAR_FIELDS, payload: { names: string[] } }
  | { type: ActionType.CHANGE_FIELD, payload: { name: string, value: FormFieldValue } }
  | { type: ActionType.CHANGE_FIELDS, payload: { [key: string]: FormFieldValue } };

type Options<Data, Errors extends ValidationErrors> = {
  entity: Data
  validator?: TValidator<Data, Errors>
  onChange?: (data: Data) => void
};

type Form<Data, Errors extends ValidationErrors> = {
  data: Data
  clear: () => void
  errors: Errors
  isValid: boolean
  validate: (options?: object) => Promise<boolean | Errors>
  clearField: (name: string) => void
  clearFields: (names: string[]) => void
  changeField: (name: string, value: FormFieldValue) => void
  changeFields: (changes: { [key: string]: FormFieldValue }) => void
};

const EVENT_CHANGE = 'CHANGE';

function Event(type: string): TEvent {
  return { type };
}

export default function useForm<Data extends object, Errors extends ValidationErrors = ValidationErrors>(
  { entity, validator, onChange = noop }: Options<Data, Errors>,
): Form<Data, Errors> {
  const [events, setEvents] = useState<TEvent[]>([]);

  function addEvent(e: TEvent) {
    setEvents([...events, e]);
  }

  const [data, dispatch] = useReducer((state: Data, action: Action) => {
    addEvent(Event(EVENT_CHANGE));

    switch (action.type) {
      case ActionType.CLEAR: {
        return structuredClone(entity);
      }

      case ActionType.CLEAR_FIELD: {
        const nextState = { ...state };
        const { name } = action.payload;
        const e = structuredClone(entity);

        setProperty(nextState, name, e[name] as FormFieldValue);

        return nextState;
      }

      case ActionType.CLEAR_FIELDS: {
        const nextState = { ...state };
        const e = structuredClone(entity);

        action.payload.names?.forEach((name) => {
          setProperty(nextState, name, getProperty(e[name], name));
        });

        return nextState;
      }

      case ActionType.CHANGE_FIELD: {
        const nextState = { ...state };
        const { name, value } = action.payload;

        setProperty(nextState, name, value);

        return nextState;
      }

      case ActionType.CHANGE_FIELDS: {
        return { ...state, ...action.payload };
      }

      default: return state;
    }
  }, structuredClone(entity), (o) => o);

  /**
   * future feature
  * const [validate, errors, setErrors] = useValidation(validator)
  * */

  const clear = useCallback(() => {
    dispatch({ type: ActionType.CLEAR });
  }, []);

  const clearField = useCallback((name: string) => {
    dispatch({ type: ActionType.CLEAR_FIELD, payload: { name } });
  }, []);

  const clearFields = useCallback((names: string[]) => {
    dispatch({ type: ActionType.CLEAR_FIELDS, payload: { names } });
  }, []);

  const changeField = useCallback((name: string, value: FormFieldValue) => {
    dispatch({ type: ActionType.CHANGE_FIELD, payload: { name, value } });
  }, []);

  const changeFields = useCallback((changes: { [key: string]: FormFieldValue }) => {
    dispatch({ type: ActionType.CHANGE_FIELDS, payload: changes });
  }, []);

  const { errors, validate: doValidation } = useValidation(validator);

  const isValid = isEmpty(errors);

  const validate = useCallback(
    (options: object) => doValidation(data, options),
    [data, doValidation],
  );

  useEffect(() => {
    if (events.length) {
      const event = events.shift();
      setEvents([...events]);

      switch (event.type) {
        case EVENT_CHANGE: {
          if (onChange) onChange(data);
          break;
        }
        default:
      }
    }
  }, [data, events, onChange]);

  return {
    data,
    clear,
    errors,
    isValid,
    validate,
    clearField,
    clearFields,
    changeField,
    changeFields,
  };
}
