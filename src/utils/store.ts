import { Store } from '@tanstack/store';

export const store = new Store({
    numCartItems: 0,
});

export const setNumCartItems = (numCartItems: number) => {
  store.setState((state) => ({ numCartItems }));
};
