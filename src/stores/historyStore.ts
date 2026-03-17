import { create } from 'zustand';

interface HistoryState<T = unknown> {
  past: T[];
  present: T | null;
  future: T[];
}

interface HistoryActions<T = unknown> {
  push: (state: T) => void;
  undo: () => T | null;
  redo: () => T | null;
  clear: () => void;
  reset: (state: T) => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  getPresent: () => T | null;
}

const MAX_HISTORY_LENGTH = 50;

export const useHistoryStore = create<HistoryState & HistoryActions>()((set, get) => ({
  past: [],
  present: null,
  future: [],

  push: (newState) => {
    const { past, present } = get();
    if (present !== null && JSON.stringify(newState) === JSON.stringify(present)) {
      return;
    }
    const newPast = present !== null ? [...past, present] : [...past];
    if (newPast.length >= MAX_HISTORY_LENGTH) {
      newPast.shift();
    }
    set({
      past: newPast,
      present: newState,
      future: [],
    });
  },

  undo: () => {
    const { past, present, future } = get();
    if (past.length === 0) {
      return null;
    }
    const previous = past[past.length - 1];
    const newPast = past.slice(0, -1);
    set({
      past: newPast,
      present: previous,
      future: present !== null ? [present, ...future] : future,
    });
    return previous;
  },

  redo: () => {
    const { past, present, future } = get();
    if (future.length === 0) {
      return null;
    }
    const next = future[0];
    const newFuture = future.slice(1);
    set({
      past: present !== null ? [...past, present] : past,
      present: next,
      future: newFuture,
    });
    return next;
  },

  clear: () => {
    set({
      past: [],
      present: null,
      future: [],
    });
  },

  reset: (state) => {
    set({
      past: [],
      present: state,
      future: [],
    });
  },

  canUndo: () => get().past.length > 0,

  canRedo: () => get().future.length > 0,

  getPresent: () => get().present,
}));

export function useKeyboardShortcuts(): void {
  const { undo, redo, canUndo, canRedo } = useHistoryStore();

  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', (e) => {
      const isUndo = (e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey;
      const isRedo = (e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey));

      if (isUndo && canUndo()) {
        e.preventDefault();
        undo();
      } else if (isRedo && canRedo()) {
        e.preventDefault();
        redo();
      }
    });
  }
}
