const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ'’\- ]{2,40}$/;

export default function isValidName(name) {
  return nameRegex.test(name.trim());
}
