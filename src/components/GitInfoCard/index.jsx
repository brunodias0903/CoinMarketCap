import React from 'react'
import { GitInfoCardTitle, GitInfoCardValue, GitInfoContainer } from './styles'

export default function GitInfoCard(props) {
  return (
    <GitInfoContainer>
      <GitInfoCardTitle>GitHub {props.title}</GitInfoCardTitle>
      <GitInfoCardValue>{props.value}</GitInfoCardValue>
    </GitInfoContainer>
  )
}
