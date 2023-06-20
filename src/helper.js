export const setLocalStorage = (key, payload) => {
  localStorage.setItem(key, JSON.stringify(payload));
};

export const getLocalStorage = (key) => {
  const values = localStorage.getItem(key);
  return values ? JSON.parse(values) : undefined;
};

export const generateRandomId = (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

export const defaultColumns = [
    {
      key: "todo",
      title: "To Do - Pending",
    },
    {
      key: "inProgress",
      title: "In Progress",
    },
    {
      key: "done",
      title: "Completed",
    },
  ];
  

export const defaultValue = {
    test: {
      key: "test",
      title: "Inbox",
      columns: defaultColumns,
      tasks: {
        "12": {
          value: "Add cart",
          id: "12",
          status: "todo",
        },
        "13": {
          value: "Add cartad sa",
          id: "13",
          status: "todo",
        },
        "12a": {
          value: "Add cart 2",
          id: "12d",
          status: "inProgress",
        },
        "12b": {
          value: "Add cart 3",
          id: "12b",
          status: "done",
        },
      },
    },
    test2: {
      key: "test2",
      title: "Starr",
      columns: defaultColumns,
      tasks: {
        "12": {
          value: "Add cart",
          id: "12",
          status: "todo",
        },
        "12a": {
          value: "Add cart 2s",
          id: "12d",
          status: "inProgress",
        },
        "12b": {
          value: "Add cart 2",
          id: "12d",
          status: "done",
        },
      },
    },
  }
