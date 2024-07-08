import React from "react";
import './List.css'

const List = ({
    dataItem: {title}, 
    deleteCard,
    editCard,
    markAsCompleted,
    }) => {
  
    return <article>
      <h3>{title}</h3>
      <button onClick = {deleteCard}>Borrar</button>
      <button onClick = {editCard}>Editar</button>
      <button onClick={markAsCompleted}>Completar</button>
    </article>;
};

export default List;
