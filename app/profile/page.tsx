'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfilePage() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Hier würde normalerweise die Logik zum Speichern der Profildaten implementiert werden
    alert('Profil aktualisiert!')
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Profil bearbeiten</CardTitle>
          <CardDescription>Aktualisiere deine persönlichen Informationen</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                  <AvatarFallback>MX</AvatarFallback>
                </Avatar>
                <Button>Profilbild ändern</Button>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Max Mustermann" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">E-Mail</Label>
                <Input id="email" type="email" defaultValue="max@example.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bio">Über mich</Label>
                <Textarea id="bio" defaultValue="Ich liebe es, neue Orte zu entdecken und Abenteuer mit Freunden zu erleben!" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="interests">Interessen (durch Kommas getrennt)</Label>
                <Input id="interests" defaultValue="Reisen, Fotografie, Kochen" />
              </div>
              <Button type="submit">Profil aktualisieren</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

