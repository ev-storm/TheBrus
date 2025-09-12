import { ref } from "vue";

const selectedProject = ref(null);

export const useSelectedProject = () => {
  const setSelectedProject = (project) => {
    selectedProject.value = project;
  };

  const clearSelectedProject = () => {
    selectedProject.value = null;
  };

  return {
    selectedProject,
    setSelectedProject,
    clearSelectedProject,
  };
};
