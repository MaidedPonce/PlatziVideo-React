import md5 from 'md5';
// md5 es un algoritmo criptografico utilizado por Gravatar
const gravatar = (email) => {
  // return the url that our avatar. Base is equal to the url that we are going to use in our image
  const base = 'https://gravatar.com/avatar/';
  // formatear nuestro correo electronico, eliminar espacios y convertirlo todo a minusculas
  const formatteEmail = (email).trim().toLowerCase();
  // hash
  const hash = md5(formatteEmail, { encoding: 'binary' });
  return `${base}${hash}`;
};

export default gravatar;
