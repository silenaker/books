const pool = new Set();
let max = 5;
const queue = [];

let uid = 0;
function genUID() {
  return ++uid;
}

const pending = {};

export default function fetch(url, options) {
  const shiftQueue = () => {
    if (queue.length) {
      const len = Math.min(max - pool.size, queue.length);
      for (let i = 0; i < len; i++) {
        const request = queue.shift();
        const { url, options, id } = request;
        const fetchPromise = fetch(url, options);
        fetchPromise
          .then(
            resp => pending[id].resolve(resp),
            resp => pending[id].reject(resp)
          )
          .finally(() => {
            delete pending[id];
            pool.delete(fetchPromise);
            shiftQueue();
          });
        pool.add(fetchPromise);
      }
    }
  };

  const unshiftQueue = () => {
    const id = genUID();
    queue.push({ url, options, id });
    shiftQueue();
    return new Promise((resolve, reject) => {
      pending[id] = { resolve, reject };
    });
  };
  return unshiftQueue();
}
