import { helper } from '@ember/component/helper';

export default helper(function formatDate(params) {
  let longData, index, slicedValue, formatType, formattedValue;
  [ longData, formatType ] = params;
  index = longData.lastIndexOf(' ');
  slicedValue = Number(longData.slice(index));
  formattedValue = new Date(slicedValue);
  if (Number(formatType)) {
    formattedValue = formattedValue.toLocaleString();
  } else {
    formattedValue = formattedValue.toLocaleDateString();
  }
  return longData.slice(0, index + 1) + formattedValue;
});
