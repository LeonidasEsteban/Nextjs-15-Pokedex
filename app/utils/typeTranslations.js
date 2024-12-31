export const typeTranslations = {
  normal: 'normal',
  fighting: 'lucha',
  flying: 'volador',
  poison: 'veneno',
  ground: 'tierra',
  rock: 'roca',
  bug: 'bicho',
  ghost: 'fantasma',
  steel: 'acero',
  fire: 'fuego',
  water: 'agua',
  grass: 'planta',
  electric: 'eléctrico',
  psychic: 'psíquico',
  ice: 'hielo',
  dragon: 'dragón',
  dark: 'siniestro',
  fairy: 'hada'
};

export const translateType = (typeObj) => {
  const typeName = typeObj.type.name;
  return typeTranslations[typeName] || typeName;
};