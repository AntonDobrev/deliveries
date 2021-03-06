### Development 

- Ensure the app is usable when started offline - Done
- Notify user if starting offline and no data is available in the offline storage
- All items are loaded at the initial - Done
- Better UX and UI for Sync and Connectivity headers (see the position; when new interaction starts, hide the sync status)
- Add a splashscreen
- Add item interface/class for the DeliveryOrder type - Postpone for refactoring
- [MARTO] Add a select by status screen and filter the items from the store - In progress
- Ensure any requests to the server errors are handled - this is not the case in the SB app - Postpone for testing 
- Adjust the keyboard behavior on inputs; add the rlevant keyboard type (next/go/previous) to the input fields - https://docs.nativescript.org/angular/ui/keyboard.html - In Progress
- Set the action bar title dynamically - Done
- Ask for confirmation before deleting an item - Done
- Adjust the synchronization to refresh the UI - Done
- Synchronization should be presented via a progress indicator/alert/modal; - Optional - display sync status combining the itemProcessed and getItemsforSync() things - Should we show this with a dialog 
- Add an enum for the Status type - http://stackoverflow.com/questions/35835984/how-to-use-a-typescript-enum-value-in-an-angular2-ngswitch-statement
- Ensure all required fields are shown in the UI and taken as user input. Create. [Marto]
- Edit allows for Status and Comments only. - Done
- Remove DeliveriesService and best usage of services - Postpone for refactoring phase

### Packaging

- Set up an official repo 
- Set up a new project and remove unneeded files 
- Add in samples page 
- Should this be an AB or NS project 
- Add the icons and assets package 
- Docs and Readme - basic functionality and methods and how to starts in in TP and NS
