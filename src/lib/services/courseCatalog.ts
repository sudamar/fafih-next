import rawCourses from '@/lib/data/courses.json'

const cardImageOverrides: Record<string, string> = {
  'livros-negros-e-livro-vermelho': 'https://i.imgur.com/qwiCmA6.jpeg',
  'sonhando-atraves-da-arteterapia': 'https://i.imgur.com/AnnChjx.png',
  'de-aion-a-jo': 'https://i.imgur.com/REzhmRK.jpeg',
  'formacao-de-membros-analistas-junguianos': 'https://i.imgur.com/lXkjLLG.png',
  'congressos-junguianos-do-ijep': 'https://i.imgur.com/M3vP6UT.png',
};

const courses = rawCourses.map((course) => {
  const overrideImage = course.slug && cardImageOverrides[course.slug];
  return {
    ...course,
    id: course.id,
    slug: course.slug,
    image: overrideImage || course.image,
  };
});

const coursesById = new Map();
const coursesBySlug = new Map();

courses.forEach((course) => {
  coursesById.set(String(course.id), course);
  if (course.slug) {
    coursesBySlug.set(course.slug, course);
  }
});

export const getAllCourses = () => courses.slice();

export const getCourseById = (id: number | string | null | undefined) => {
  if (id === undefined || id === null) {
    return null;
  }

  return coursesById.get(String(id)) || null;
};

export const getCourseBySlug = (slug: string | null | undefined) => {
  if (!slug) {
    return null;
  }

  return coursesBySlug.get(String(slug)) || null;
};

export const getCourseDetails = (identifier: number | string, { fallback = true } = {}) => {
  // Check if identifier is a number (for ID lookup) or string (for slug lookup)
  const course = typeof identifier === 'number' 
    ? getCourseById(identifier) 
    : getCourseById(identifier) || getCourseBySlug(identifier);
    
  if (course) {
    return course;
  }

  if (!fallback) {
    return null;
  }

  if (courses.length === 0) {
    return null;
  }

  const first = getCourseById(1) || courses[0];
  return first || null;
};

export const listCourseCards = () =>
  courses.map((course) => ({
    id: course.id,
    category: course.category,
    categoryLabel: course.categoryLabel,
    image: course.image,
    title: course.title,
    description: course.description,
    price: course.price,
    modalidade: course.modalidade,
    slug: course.slug,
  }));

export const listCategories = () => {
  const map = new Map();

  courses.forEach((course) => {
    const key = course.category || 'outros';
    const label = course.categoryLabel || course.category || 'Outros';

    if (!map.has(key)) {
      map.set(key, { id: key, label, count: 0 });
    }

    map.get(key).count += 1;
  });

  return Array.from(map.values()).sort((a, b) => a.label.localeCompare(b.label));
};

export const getCourseStats = () => ({
  totalCourses: courses.length,
  totalCategories: listCategories().length,
});