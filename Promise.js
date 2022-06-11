function MyPromise(callback) {
  let resolvedValue;
  let rejectedValue;
  let thenCallback;
  let catchCallback;
  let status = "PENDING";

  const onResolve = (value) => {
    if (value) {
      resolvedValue = value;
    }
    status = "RESOLVED";
    thenCallback?.(resolvedValue);
    thenCallback = null;
  };
  const onReject = (value) => {
    if (value) {
      rejectedValue = value;
    }
    status = "REJECTED";
    if (catchCallback) {
      catchCallback(rejectedValue);
      catchCallback = null;
    } else {
      onResolve(new Error(rejectedValue));
    }
    return this;
  };

  const then = (thenCb) => {
    thenCallback = thenCb;
    if (status === "PENDING") return;
    onResolve();
  };

  const catches = (catchCb) => {
    catchCallback = catchCb;
    if (status === "PENDING") return;
    onReject();
  };

  try {
    callback(onResolve, onReject);
  } catch (err) {
    return err;
  }
  return { then, catch: catches };
}

module.exports = MyPromise;

// MyPromise((res, rej) => {
//   res(1);
// }).then().catch;
