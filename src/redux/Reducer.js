const initialState = {
  listView: false,
  labels_data: [],
  toggle: 'English',
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ListViewPress':
      return {
        ...state,
        listView: !state.listView,
      };
    case 'LabelData':
      return {
        ...state,
        labels_data: action.payload,
      };
    case 'Toggle': {
      return {...state, toggle: action.payload};
    }
    default:
      return state;
  }
};
