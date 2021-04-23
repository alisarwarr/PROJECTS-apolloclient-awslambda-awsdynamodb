import addBookmark from './addBookmark';
import delBookmark from './delBookmark';
import allBookmarks from './allBookmarks';
import Bookmark from './type/Bookmark';

type AppSyncEvent = {
    info: {
        fieldName: string
    },
    arguments: {
        thatId: string,
        bookmarkInput: Bookmark
    }
}

exports.handler = async(event: AppSyncEvent) => {
    switch(event.info.fieldName) {
        case "addBookmark":
            return await addBookmark(event.arguments.bookmarkInput);

        case "delBookmark":
            return await delBookmark(event.arguments.thatId);

        case "allBookmarks":
            return await allBookmarks();
        
        default:
            return null;
    }
}