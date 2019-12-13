exports.shuffle = word => {
  let parts = word.split('');
  for (let i = parts.length; i > 0; ) {
    const random = parseInt(Math.random() * i);
    const temp = parts[--i];
    parts[i] = parts[random];
    parts[random] = temp;
  }
  return parts.join('');
};
