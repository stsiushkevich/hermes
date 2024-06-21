import yup from 'yup';

const { object, string } = yup;

const CredentialsScheme = object({
  username: string().nullable().required(),
  password: string().nullable().required(),
});

export default CredentialsScheme;
