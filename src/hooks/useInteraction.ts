import { useState } from 'react'
import { Interaction } from '../types/Interaction.interface'
import { Optional } from '../utils/Optional/Optional'

type InteractionData = Optional<Interaction, 'cancel'>

interface UseInteraction {
  (): [Interaction | null, (interaction: InteractionData) => void]
}

export const useInteraction: UseInteraction = () => {
  const [interaction, setInteraction] = useState<Interaction | null>(null)

  function pushInteraction(interaction: InteractionData) {
    setInteraction({
      message: interaction.message,
      confirm() {
        interaction.confirm()
        removeInteraction()
      },
      cancel() {
        interaction?.cancel && interaction.cancel()
        removeInteraction()
      },
    })
  }

  function removeInteraction() {
    setInteraction(null)
  }

  return [interaction, pushInteraction]
}