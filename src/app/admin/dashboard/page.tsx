import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboardPage() {
  return (
    <div className="grid gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">


        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
            <CardDescription>
              Update your skills and expertise
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Manage technical skills and proficiency levels.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Experience</CardTitle>
            <CardDescription>
              Professional experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Update your work history and achievements.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>CV Management</CardTitle>
            <CardDescription>
              Resume and CV settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Manage your CV information and downloads.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Settings</CardTitle>
            <CardDescription>
              Contact form configuration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Configure contact form and message handling.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Messages</CardTitle>
            <CardDescription>
              Contact form submissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>View and manage contact form messages.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
