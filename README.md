# Task Board Application
## User Story 
As a full stack web development student with multiple tasks to organize
I WANT a task board 
SO THAT I can add individual project tasks, manage their state of progress and track overall project progress accordingly

## Acceptance Criteria

- GIVEN a task board to manage a project
- WHEN I open the task board
- THEN the list of project tasks is displayed in columns representing the task progress state (Not Yet Started, In Progress, Completed)
- WHEN I view the task board for the project
- THEN each task is color coded to indicate whether it is nearing the deadline (yellow) or is overdue (red)
- WHEN I click on the button to define a new task
- THEN I can enter the title, description and deadline date for the new task into a modal dialog
- WHEN I click the save button for that task
- THEN the properties for that task are saved in localStorage
- WHEN I drag a task to a different progress column
- THEN the task's progress state is updated accordingly and will stay in the new column after refreshing
- WHEN I click the delete button for a task
- THEN the task is removed from the task board and will not be added back after refreshing
- WHEN I refresh the page
- THEN the saved tasks persist

## Live Site
![blog demo](https://github.com/daimyo1/Task-Board/assets/163930521/53eb0da9-ac34-4dea-946a-dc36bf83164b)


### Usage
This tool offers a user-friendly task board interface that organizes project tasks into columns based on their progress:
To Do, In Progress, and Done. Tasks are color-coded to signal approaching deadlines. You can easily create new tasks by entering a title, description, and deadline in a modal dialog, with all task details saved locally. 
Tasks can be moved between columns by dragging them, and all changes persist even after refreshing the page. Additionally, tasks can be deleted from the board permanently, ensuring your project management remains efficient and organized.
