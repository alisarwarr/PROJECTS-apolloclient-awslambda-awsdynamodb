import createTodo from './createTodo';
import deleteTodo from './deleteTodo';
import updateTodo from './updateTodo';
import allTodos from './allTodos';
import Todo from './type/Todo';

type AppSyncEvent = {
    info: {
        fieldName: string
    },
    arguments: {
        thatId: string,
        todosInput: Todo
    }
}

exports.handler = async(event: AppSyncEvent) => {
    switch(event.info.fieldName) {
        case "createTodo":
            return await createTodo(event.arguments.todosInput);

        case "deleteTodo":
            return await deleteTodo(event.arguments.thatId);

        case "updateTodo":
            return await updateTodo(event.arguments.todosInput);

        case "allTodos":
            return await allTodos();
        
        default:
            return null;
    }
}