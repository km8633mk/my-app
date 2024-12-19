'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Hier würde normalerweise die Logik zum Speichern der Einstellungen implementiert werden
    alert('Einstellungen gespeichert!')
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Einstellungen</CardTitle>
          <CardDescription>Passe deine App-Einstellungen an</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications">Benachrichtigungen</Label>
                <Switch id="notifications" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="darkMode">Dunkler Modus</Label>
                <Switch id="darkMode" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="language">Sprache</Label>
                <select id="language" className="w-full p-2 border rounded">
                  <option value="de">Deutsch</option>
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Passwort ändern</Label>
                <Input id="password" type="password" placeholder="Neues Passwort" />
              </div>
              <Button type="submit">Einstellungen speichern</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

