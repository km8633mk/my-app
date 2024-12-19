import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function EventOverview() {
  return (
    <div className="grid gap-6 mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Wochenendtrip nach Berlin</CardTitle>
          <CardDescription>15. - 17. Juli 2023</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="flex -space-x-2">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" alt="@user1" />
                <AvatarFallback>U1</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" alt="@user2" />
                <AvatarFallback>U2</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" alt="@user3" />
                <AvatarFallback>U3</AvatarFallback>
              </Avatar>
            </div>
            <Button>Freunde einladen</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fotos und Videos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <img src="/placeholder.svg?height=100&width=100" alt="Event photo 1" className="rounded" />
            <img src="/placeholder.svg?height=100&width=100" alt="Event photo 2" className="rounded" />
            <img src="/placeholder.svg?height=100&width=100" alt="Event photo 3" className="rounded" />
          </div>
          <Button className="mt-4">Fotos hochladen</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Packliste</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside">
            <li>Kleidung für 3 Tage</li>
            <li>Zahnbürste und Zahnpasta</li>
            <li>Kamera</li>
            <li>Powerbank</li>
          </ul>
          <div className="flex gap-2 mt-4">
            <Input placeholder="Neuer Eintrag" />
            <Button>Hinzufügen</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Nachrichten</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" alt="@user1" />
                <AvatarFallback>U1</AvatarFallback>
              </Avatar>
              <div className="bg-muted p-2 rounded-lg">
                <p className="font-semibold">Max</p>
                <p>Ich freue mich schon sehr auf den Trip!</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" alt="@user2" />
                <AvatarFallback>U2</AvatarFallback>
              </Avatar>
              <div className="bg-muted p-2 rounded-lg">
                <p className="font-semibold">Anna</p>
                <p>Sollen wir uns am Bahnhof treffen?</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Textarea placeholder="Deine Nachricht" />
            <Button>Senden</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

