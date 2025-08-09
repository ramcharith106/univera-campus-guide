import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Building, MapPin } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { College, PG, db } from '@/lib/firebase';
import { toast } from 'sonner';

const Admin = () => {
  const { user } = useAuth();
  const [colleges, setColleges] = useState<College[]>([]);
  const [pgs, setPGs] = useState<PG[]>([]);
  const [showCollegeDialog, setShowCollegeDialog] = useState(false);
  const [showPGDialog, setShowPGDialog] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [collegeData, pgData] = await Promise.all([
        db.getColleges(),
        db.getPGs()
      ]);
      setColleges(collegeData);
      setPGs(pgData);
    } catch (error) {
      toast.error('Failed to load data');
    }
  };

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Access Denied</h1>
            <p className="text-muted-foreground">You need admin privileges to access this page.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage colleges and PG accommodations</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Colleges Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Building className="h-5 w-5" />
                  <span>Colleges ({colleges.length})</span>
                </div>
                <Dialog open={showCollegeDialog} onOpenChange={setShowCollegeDialog}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Add College
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New College</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>College Name</Label>
                          <Input placeholder="Enter college name" />
                        </div>
                        <div>
                          <Label>Location</Label>
                          <Input placeholder="Enter location" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>City</Label>
                          <Input placeholder="Enter city" />
                        </div>
                        <div>
                          <Label>State</Label>
                          <Input placeholder="Enter state" />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label>Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Engineering">Engineering</SelectItem>
                              <SelectItem value="Medical">Medical</SelectItem>
                              <SelectItem value="Arts">Arts</SelectItem>
                              <SelectItem value="Commerce">Commerce</SelectItem>
                              <SelectItem value="Law">Law</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Annual Fees (₹)</Label>
                          <Input type="number" placeholder="250000" />
                        </div>
                        <div>
                          <Label>Rating</Label>
                          <Input type="number" min="0" max="5" step="0.1" placeholder="4.5" />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setShowCollegeDialog(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => {
                          toast.success('College added successfully!');
                          setShowCollegeDialog(false);
                        }}>
                          Add College
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {colleges.slice(0, 5).map(college => (
                  <div key={college.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{college.name}</div>
                      <div className="text-sm text-muted-foreground">{college.location}</div>
                    </div>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* PGs Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>PGs ({pgs.length})</span>
                </div>
                <Dialog open={showPGDialog} onOpenChange={setShowPGDialog}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Add PG
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New PG</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>PG Name</Label>
                          <Input placeholder="Enter PG name" />
                        </div>
                        <div>
                          <Label>Location</Label>
                          <Input placeholder="Enter location" />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label>Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Boys">Boys</SelectItem>
                              <SelectItem value="Girls">Girls</SelectItem>
                              <SelectItem value="Co-ed">Co-ed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Monthly Rent (₹)</Label>
                          <Input type="number" placeholder="12000" />
                        </div>
                        <div>
                          <Label>Rating</Label>
                          <Input type="number" min="0" max="5" step="0.1" placeholder="4.2" />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setShowPGDialog(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => {
                          toast.success('PG added successfully!');
                          setShowPGDialog(false);
                        }}>
                          Add PG
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pgs.slice(0, 5).map(pg => (
                  <div key={pg.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{pg.name}</div>
                      <div className="text-sm text-muted-foreground">{pg.location}</div>
                    </div>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;