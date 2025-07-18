import { useHistoryStore } from '@/store/useHistoryStore';
import React from 'react'
import { useParams } from 'react-router-dom'

const Recipe = () => {
    const {historyRecipes} = useHistoryStore();
    const {id} = useParams();
    const userRecipe = historyRecipes?.filter((recipe) => recipe === id);
  return (
    <>
    <h1>{userRecipe.recipe?.name}</h1>
    </>
  )
}

export default Recipe