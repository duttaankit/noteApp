//JavaScript Document

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const getNoteDate = () => {

  const d = new Date();

  const year = d.getFullYear();
  const month = months[d.getMonth()];
  const date = d.getDate();
  const hour = d.getHours();
  const min = d.getMinutes();
  const day = days[d.getDay()];

  const noteExactT = `${day}, ${month} ${date} ${year} at ${hour}:${min}`;

  return noteExactT;

}