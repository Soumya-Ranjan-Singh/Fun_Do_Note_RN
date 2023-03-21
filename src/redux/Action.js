export const listViewPress = () => dispatch => {
  dispatch({type: 'ListViewPress'});
};

export const labelData = labels => {
  return {
    type: 'LabelData',
    payload: labels,
  };
};

export const toggleLang = toggle => {
  return {
    type: 'Toggle',
    payload: toggle,
  };
};
