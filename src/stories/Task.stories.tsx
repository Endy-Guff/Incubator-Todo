import type {Meta, StoryObj} from '@storybook/react';

import {Button} from './Button';
import {Task} from "../Task";
import {TaskType} from "../Todolist";
import {action} from "@storybook/addon-actions";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
    title: 'TodoList/Task',
    component: Task,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        changeTaskStatus: action('changeTaskStatus'),
        changeTaskTitle: action('changeTaskTitle'),
        removeTask: action('removeTask'),
        todolistId: 'id1'
    }
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsNotDoneStory: Story = {
    args: {task: {id: '1', isDone: false, title: 'example'}}
}

export const TaskIsDoneStory: Story = {
    args: {task: {id: '1', isDone: true, title: 'example'}}
}