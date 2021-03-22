function getField(val, max) {
  if (val.length === 1 && val[0] > max[0]) {
    val = '0' + val;
  }

  if (val.length === 2) {
    if (Number(val) === 0) {
      val = '01'

      // this can happen when user paste number
    } else if (val > max) {
      val = max;
    }
  } else if (val.length === 4) {
    if (Number(val) === 0) {
      val = '2021'

      // this can happen when user paste number
    } else if (val > max) {
      val = max;
    }
  }

  return val;
}

function inputFormatter(val) {
  const thisYear = String(new Date().getFullYear());

  let day = getField(val.substring(0, 2), '31');
  let month = getField(val.substring(2, 4), '12');
  let year = getField(val.substring(4, 8), thisYear);

  return (
    day + (month.length ? '/' + month : '') + (year.length ? '/' + year : '')
  );
}

export { inputFormatter };