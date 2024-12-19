'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createEvent } from '../actions/create-event'

export function CreateEventForm() {
  const [message, setMessage] = useState('')

  async function handleSubmit(formData: FormData) {
    const result = await createEvent(formData)
    if (result.success) {
      setMessage(result.message)
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="eventName">Event Name</Label>
        <Input id="eventName" name="eventName" required />
      </div>
      <div>
        <Label htmlFor="eventDate">Event Datum</Label>
        <Input id="eventDate" name="eventDate" type="date" required />
      </div>
      <Button type="submit">Event erstellen</Button>
      {message && <p className="text-green-600">{message}</p>}
    </form>
  )
}

