export const categoryList = ['any', 'linux', 'bash', 'uncategorized', 'docker', 'sql', 'cms', 'code', 'devops']

export const difficultyList = ['any', 'Easy', 'Medium', 'Hard']

export const tagList = ['BASH', 'DevOps', 'Docker', 'HTML', 'JavaScript', 'Kubernetes', 'Laravel', 'Linux', 'MySQL', 'PHP', 'WordPress']

export function validateTags(tags:string) {
  if(tags === 'none') return true //No tags is also valid

  const usedTags = tags.split(',')

  const validTags = usedTags.filter(tag => tagList.includes(tag))

  return validTags.length === usedTags.length //All tags must be valid
}