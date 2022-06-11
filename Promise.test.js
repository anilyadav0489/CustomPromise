const MyPromise = require("./Promise.js");

describe("Test own implementation of Promise", () => {
  it("test if Promise resolves immediately", () => {
    const myPromiseOb = new MyPromise((res, rej) => {
      res(1);
    });

    let resolvedValue;
    myPromiseOb.then((data) => (resolvedValue = data));
    expect(resolvedValue).toEqual(1);
  });
  it("test if Promise rejects immediately", () => {
    const myPromiseOb = new MyPromise((res, rej) => {
      rej("failed");
    });

    let rejectedValue;
    myPromiseOb.catch((data) => (rejectedValue = data));
    expect(rejectedValue).toEqual("failed");
  });
  it("test if Promise resolves asynchronously", async () => {
    const response = await new MyPromise((res, rej) => {
      setTimeout(() => {
        res("asynchronously resolved");
      }, 10);
    });
    let resolvedValue = response;
    expect(resolvedValue).toEqual("asynchronously resolved");
  });
  it("test if Promise rejects asynchronously", async () => {
    // try {
    //   const response = await new MyPromise((res, rej) => {
    //     setTimeout(() => {
    //       rej("asynchronously rejected");
    //     }, 10);
    //   });
    // } catch (err) {
    //   rejectedValue = err;
    //   expect(rejectedValue).toEqual("asynchronously rejected");
    // }

    const response = new MyPromise((res, rej) => {
      setTimeout(() => {
        rej("asynchronously rejected");
      }, 10);
    });

    let rejectedValue;
    response.catch((data) => {
      rejectedValue = data;
      expect(rejectedValue).toEqual("asynchronously rejected");
    });
  });
});
