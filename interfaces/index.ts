interface LearningPath {
  id: string;
  title: string;
  description: string;
  skills: string[];
  icon: string;
  color: [string, string, ...string[]]
  pattern: string;
}


export default LearningPath ;