import addLollypop from './addLollypop';
import allLollypop from './allLollypop';
import getLollypopById from './getLollypopById';
import Lollypop from './type/Lollypop';

type AppSyncEvent = {
    info: {
        fieldName: string
    },
    arguments: {
        pathId: string,
        lollypopInput: Lollypop
    }
}

exports.handler = async(event: AppSyncEvent) => {
    switch(event.info.fieldName) {
        case "addLollypop":
            return await addLollypop(event.arguments.lollypopInput);

        case "allLollypop":
            return await allLollypop();

        case "getLollypopById":
            return await getLollypopById(event.arguments.pathId);

        default:
            return null;
    }
}