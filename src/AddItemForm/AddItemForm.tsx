import {ChangeEvent, KeyboardEvent, useState} from "react";
import TextField from '@mui/material/TextField';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IconButton from "@mui/material/IconButton";
import {useAddItemForm} from "./hooks/useAddItemForm";

type PropsType = {
	addItem: (title: string) => void
}

export const AddItemForm = ({addItem}: PropsType) => {
	const {
		title,
		error,
		changeItemHandler,
		addItemOnKeyUpHandler,
		addItemHandler
	} = useAddItemForm(addItem)

	return (
		<div>
			<TextField
				label="Enter a title"
				variant={'outlined'}
				value={title}
				size={'small'}
				error={!!error}
				helperText={error}
				onChange={changeItemHandler}
				onKeyUp={addItemOnKeyUpHandler}
			/>
			<IconButton onClick={addItemHandler} color={'primary'}>
				<AddBoxIcon/>
			</IconButton>
		</div>
	)
}


