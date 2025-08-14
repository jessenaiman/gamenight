import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, UserCheck, UserX } from "lucide-react";

// Mock data - in a real app, this would be fetched from a database.
const pendingRegistrations = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', status: 'Woman', submitted: '2 hours ago' },
  { id: 2, name: 'Bob Williams', email: 'bob@example.com', status: 'Man', submitted: '5 hours ago' },
  { id: 3, name: 'Charlie & Dana', email: 'couple@example.com', status: 'Couple', submitted: '1 day ago' },
  { id: 4, name: 'Eve Davis', email: 'eve@example.com', status: 'Woman', submitted: '2 days ago' },
];

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Card className="shadow-xl">
        <CardHeader>
            <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                    <ShieldCheck className="w-8 h-8 text-primary" />
                </div>
                <div>
                    <CardTitle className="text-3xl font-bold font-headline">Admin Dashboard</CardTitle>
                    <CardDescription>Review and manage event registrations.</CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-semibold mb-4">Pending Registrations</h3>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Submitted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingRegistrations.map((reg) => (
                  <TableRow key={reg.id}>
                    <TableCell className="font-medium">{reg.name}</TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">{reg.email}</TableCell>
                    <TableCell>
                      <Badge variant={reg.status === 'Couple' ? 'default' : 'secondary'}>{reg.status}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">{reg.submitted}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button variant="ghost" size="icon" className="text-green-500 hover:text-green-500 hover:bg-green-500/10">
                          <UserCheck className="h-4 w-4" />
                          <span className="sr-only">Approve</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-500 hover:bg-red-500/10">
                          <UserX className="h-4 w-4" />
                          <span className="sr-only">Deny</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {pendingRegistrations.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>No pending registrations.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
