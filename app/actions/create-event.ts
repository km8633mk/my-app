'use server'

import { revalidatePath } from 'next/cache'

export async function createEvent(formData: FormData) {
  // In einer echten Anwendung würden Sie hier die Daten in einer Datenbank speichern
  const eventName = formData.get('eventName')
  const eventDate = formData.get('eventDate')
  
  // Simuliere eine Verzögerung für die Datenbankoperation
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Revalidiere die Startseite, um das neue Event anzuzeigen
  revalidatePath('/')
  
  return { success: true, message: `Event "${eventName}" für ${eventDate} wurde erstellt!` }
}

