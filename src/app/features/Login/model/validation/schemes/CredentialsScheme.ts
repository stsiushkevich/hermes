import * as yup from 'yup';

const CredentialsScheme = yup.object({
  username: yup.string().nullable().required(),
  password: yup.string().nullable().required(),
});

export default CredentialsScheme;
