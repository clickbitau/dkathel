'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RotateCcw, ExternalLink, Calendar, Maximize2, X, FileText, Download } from 'lucide-react';

interface Certification {
  _id: string;
  name: string;
  description?: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  image: string;
  pdfUrl?: string;
  skills: string[];
  category: string;
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
}

interface CertificationFlipCardProps {
  certification: Certification;
}

export default function CertificationFlipCard({ certification }: CertificationFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showLargeImage, setShowLargeImage] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleReset = () => {
    setIsFlipped(false);
  };

  const openLargeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowLargeImage(true);
  };

  const closeLargeImage = () => {
    setShowLargeImage(false);
  };

  return (
    <>
      <div className="group perspective-1000">
        <div
          className={`relative w-full h-[520px] transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''
            }`}
          onClick={handleFlip}
        >
          {/* Front of card - Certificate Image as Main Focus */}
          <div className="absolute inset-0 w-full h-full backface-hidden">
            <Card className="h-full hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900">
              <CardHeader className="pb-3 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
                <div className="flex items-start justify-between">
                  <Badge className="bg-white/20 text-white border-white/30 text-xs font-semibold">
                    {certification.category}
                  </Badge>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20 text-white"
                      onClick={openLargeImage}
                    >
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20 text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReset();
                      }}
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-sm font-bold text-white line-clamp-2 leading-tight">
                  {certification.name}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1 flex items-center justify-center p-6 bg-gradient-to-br from-slate-50 to-white dark:from-slate-700 dark:to-slate-800">
                <div className="relative w-full h-80 bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-600">
                  <Image
                    src={encodeURI(certification.image)}
                    alt={certification.name}
                    fill
                    className="object-contain p-3"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </CardContent>

              <div className="p-4 pt-0 text-center bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-600/20 dark:to-purple-600/20">
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 font-medium">Click to view details • Click expand icon to view larger</p>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
              </div>
            </Card>
          </div>

          {/* Back of card - Details */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
            <Card className="h-full bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-800 dark:via-slate-700 dark:to-slate-900 hover:shadow-2xl transition-all duration-500 border-0">
              <CardHeader className="pb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white">
                <div className="flex items-start justify-between">
                  <Badge className="bg-white/20 text-white border-white/30 text-xs font-semibold">
                    {certification.category}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 hover:bg-white/20 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReset();
                    }}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="text-lg font-bold text-white line-clamp-2 leading-tight">
                  {certification.name}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-5 p-6">
                {/* Description */}
                {certification.description && (
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      Description
                    </h4>
                    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed line-clamp-3">
                      {certification.description}
                    </p>
                  </div>
                )}

                {/* Date Information */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Timeline
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 p-2 rounded-lg">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Issued: {formatDate(certification.issueDate)}</span>
                    </div>
                    {certification.expiryDate && (
                      <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 p-2 rounded-lg">
                        <Calendar className="h-4 w-4 text-orange-600" />
                        <span className="font-medium">Expires: {formatDate(certification.expiryDate)}</span>
                      </div>
                    )}
                    {certification.credentialId && (
                      <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 p-2 rounded-lg">
                        <span className="font-mono text-xs font-medium">ID: {certification.credentialId}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Skills */}
                {certification.skills && certification.skills.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {certification.skills.slice(0, 4).map((skill) => (
                        <Badge key={skill} className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-medium border-0">
                          {skill}
                        </Badge>
                      ))}
                      {certification.skills.length > 4 && (
                        <Badge className="bg-gradient-to-r from-slate-500 to-slate-600 text-white text-xs font-medium border-0">
                          +{certification.skills.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="pt-2 space-y-2">
                  {certification.pdfUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 hover:from-blue-600 hover:to-purple-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(encodeURI(certification.pdfUrl!), '_blank');
                      }}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      View PDF
                    </Button>
                  )}
                  {certification.credentialUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(certification.credentialUrl, '_blank');
                      }}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Credential
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Large Image Modal */}
      {showLargeImage && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative max-w-5xl max-h-[95vh] bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700">
            <div className="absolute top-4 right-4 z-10">
              <Button
                variant="ghost"
                size="sm"
                className="h-10 w-10 p-0 bg-white/90 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600"
                onClick={closeLargeImage}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <h3 className="text-xl font-bold">{certification.name}</h3>
              <p className="text-blue-100 text-sm mt-1">{certification.category}</p>
            </div>
            <div className="relative w-full h-full p-6 bg-slate-50 dark:bg-slate-800">
              <div className="relative w-full h-[70vh] bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-600">
                <Image
                  src={encodeURI(certification.image)}
                  alt={certification.name}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1000px"
                />
              </div>
            </div>
            {certification.pdfUrl && (
              <div className="p-6 bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
                <Button
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(certification.pdfUrl!, '_blank');
                  }}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  View Full PDF Document
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
