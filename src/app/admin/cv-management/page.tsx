
"use client";

import { useState, useEffect, type FormEvent } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { uploadCv, getCurrentCvInfo } from '@/actions/cvActions';
import { UploadCloud, FileText, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from 'next/link';

export default function AdminCvManagementPage() {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentCv, setCurrentCv] = useState<{fileName: string | null, lastModified: Date | null}>({fileName: null, lastModified: null});
  const [isLoadingCvInfo, setIsLoadingCvInfo] = useState(true);

  const fetchCvInfo = async () => {
    setIsLoadingCvInfo(true);
    const info = await getCurrentCvInfo();
    setCurrentCv(info || { fileName: null, lastModified: null });
    setIsLoadingCvInfo(false);
  };

  useEffect(() => {
    fetchCvInfo();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFile) {
      toast({
        title: "No File Selected",
        description: "Please select a PDF file to upload.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('cvFile', selectedFile);

    const result = await uploadCv(formData);

    if (result.success) {
      toast({
        title: "CV Uploaded",
        description: result.message,
        variant: "default",
        className: "bg-green-500 text-white",
      });
      setSelectedFile(null); // Clear the file input
      if (event.target instanceof HTMLFormElement) {
        event.target.reset(); // Reset the form fields
      }
      fetchCvInfo(); // Refresh CV info
    } else {
      toast({
        title: "Upload Failed",
        description: result.message,
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <FileText className="mr-3 h-6 w-6 text-primary" /> CV Management
          </CardTitle>
          <CardDescription>Upload and manage your curriculum vitae (CV). The uploaded CV will be available for download on your homepage.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="cvFile" className="text-base font-medium">Upload New CV (PDF only)</Label>
              <div className="mt-2 flex items-center gap-3">
                <Input
                  id="cvFile"
                  name="cvFile"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="flex-grow file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                  disabled={isSubmitting}
                />
              </div>
              {selectedFile && <p className="text-sm text-muted-foreground mt-2">Selected file: {selectedFile.name}</p>}
            </div>
            <Button type="submit" disabled={isSubmitting || !selectedFile} className="w-full sm:w-auto">
              <UploadCloud className="mr-2 h-4 w-4" />
              {isSubmitting ? "Uploading..." : "Upload CV"}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
           <div className="w-full space-y-3">
            <h3 className="text-lg font-semibold">Current CV Status</h3>
            {isLoadingCvInfo ? (
              <p className="text-muted-foreground">Loading CV information...</p>
            ) : currentCv.fileName ? (
              <div className="flex items-center gap-3 p-3 border rounded-md bg-green-50 border-green-200">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-green-700">
                    Current CV: <Link href={`/${currentCv.fileName}`} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">{currentCv.fileName}</Link>
                  </p>
                  {currentCv.lastModified && (
                    <p className="text-xs text-green-600">
                      Last updated: {currentCv.lastModified.toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-3 border rounded-md bg-yellow-50 border-yellow-200">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <p className="text-sm text-yellow-700">No CV has been uploaded yet. Upload one using the form above.</p>
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
