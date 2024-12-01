import axios from "axios";

const getTodos = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.error("Error with get todos", error);
  }
};

export default getTodos;
