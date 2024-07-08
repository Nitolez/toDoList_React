import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import data from "./data";
import List from "../List";
import './Form.css'

const Form = () => {
  const [items, setItems] = useState(data); //representa los todos
  const [values, setValues] = useState({
    title: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(null);
  const [popUpEdit, setPopUp] = useState(false); 
  const [completedItems, setCompletedItems] = useState([]);



  // Precarga de datos
  useEffect(() => {
    setItems(data);
  }, []);

  //Temporizador para que desaparesca el input en 20sec
  useEffect(() => {
    if (values.title) {
      const timer = setTimeout(() => {
        setValues({ title: "" });
      }, 20000);

      return () => clearTimeout(timer);
    }
  }, [values.title]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;

    const newItem = {
      title,
    };

    const validationError = validateInput(title);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    if (isEditing) {
      const updatedItems = [...items];
      updatedItems[currentItemIndex] = { title };
      setItems(updatedItems);
      setIsEditing(false);
      setCurrentItemIndex(null);
    } else {
      const newItem = { title };
      setItems([newItem, ...items]);
    }

    setValues({ title: "" });
    setErrorMessage("");
  };
  const clearItems = () => setItems([]); //Refresca el dom

  const resetItems = () => setItems(data); //Refresca el dom

  const deleteItem = (pos) => {
    const remainingItems = items.filter((item, index) => index !== pos);
    setItems(remainingItems);
  };

  const editItem = (pos) => {
    const item = items[pos];
    setValues({ title: item.title });
    setIsEditing(true);
    setCurrentItemIndex(pos);
    setPopUp(true);
  };

  const renderItems = () =>
    items.map((item, i) => (
      <List
        key={uuidv4()}
        dataItem={item}
        deleteCard={() => deleteItem(i)}
        editCard={() => editItem(i)}
        markAsCompleted={() => markAsCompleted(i)}
      />
    ));

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const validateInput = (value) => {
    if (value.length < 6) {
      setErrorMessage("El titulo tiene que tener al menos 6 caracteres");
    } else {
      setErrorMessage("");
    }
  };

  
  const markAsCompleted = (pos) => {
    const itemToComplete = items[pos];
    setCompletedItems([...completedItems, itemToComplete]);
    deleteItem(pos);
  };
  

  
  return (
    <section>
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label htmlFor="name">Inserta la tarea</label>
          <input
            type="text"
            name="title"
            value={values.title}
            onChange={handleChange}
          />
        </div>

        {values.title ? (
          <button type="submit">
            {isEditing ? "Guardar cambios" : "Crear"}
          </button>
        ) : (
          <p></p>
        )}
        <p>{errorMessage}</p>
      </form>

      <button onClick={clearItems}>Borrar todos</button>
      <button onClick={resetItems}>Recargar</button>
      <button onClick={() => deleteItem(0)}>Borrar primer elemento</button>

      {renderItems()}
    </section>
  );
};

export default Form;
