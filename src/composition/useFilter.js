import { ref, onMounted, onUnmounted, computed } from 'vue';
import { filter } from '../utils/todoStorage';

const validHash = ['all', 'completed', 'active'];

export default function useFilter(todosRef) {
  const visibilityRef = ref('all');
 

  const onHashChagne = () => {
    const hash = location.hash.replace(/^#\/?/, '');
    if (validHash.includes(hash)) {
      visibilityRef.value = hash;
    } else {
      location.hash = '';
      visibilityRef.value = 'all';
    }
  };

  const filteredTodosRef = computed(() => {
    return filter(todosRef.value, visibilityRef.value);
  });

  const remainingRef = computed(() => {
    return filter(todosRef.value, 'active').length
  });

  const completedRef = computed(() => {
    return filter(todosRef.value, 'completed').length
  });

  onMounted(() => {
    window.addEventListener('hashchange', onHashChagne);
  });

  onUnmounted(() => {
    window.removeEventListener('hashchange', onHashChagne);
  });

  return {
    visibilityRef,
    filteredTodosRef,
    remainingRef,
    completedRef
  };
}
