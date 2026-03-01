import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface StudentProfile {
  name: string;
  class: string;
  school: string;
  subjects: string[];
  marks: Record<string, number>;
  interests: string[];
  location: string;
  careerGoals: string[];
}

export interface AssessmentResult {
  logical: number;
  numerical: number;
  verbal: number;
  interest: number;
  completed: boolean;
  recommendedStream: string;
  confidence: number;
}

interface BeaconContextType {
  profile: StudentProfile;
  assessment: AssessmentResult;
  updateProfile: (updates: Partial<StudentProfile>) => void;
  updateAssessment: (updates: Partial<AssessmentResult>) => void;
  isProfileComplete: boolean;
}

const defaultProfile: StudentProfile = {
  name: '',
  class: '',
  school: '',
  subjects: [],
  marks: {},
  interests: [],
  location: '',
  careerGoals: [],
};

const defaultAssessment: AssessmentResult = {
  logical: 0,
  numerical: 0,
  verbal: 0,
  interest: 0,
  completed: false,
  recommendedStream: '',
  confidence: 0,
};

const BeaconContext = createContext<BeaconContextType | null>(null);

export const BeaconProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('beacon_profile');
    return saved ? JSON.parse(saved) : defaultProfile;
  });

  const [assessment, setAssessment] = useState<AssessmentResult>(() => {
    const saved = localStorage.getItem('beacon_assessment');
    return saved ? JSON.parse(saved) : defaultAssessment;
  });

  useEffect(() => {
    localStorage.setItem('beacon_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('beacon_assessment', JSON.stringify(assessment));
  }, [assessment]);

  const updateProfile = (updates: Partial<StudentProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const updateAssessment = (updates: Partial<AssessmentResult>) => {
    setAssessment(prev => ({ ...prev, ...updates }));
  };

  const isProfileComplete = Boolean(profile.name && profile.class);

  return (
    <BeaconContext.Provider value={{ profile, assessment, updateProfile, updateAssessment, isProfileComplete }}>
      {children}
    </BeaconContext.Provider>
  );
};

export const useBeacon = () => {
  const ctx = useContext(BeaconContext);
  if (!ctx) throw new Error('useBeacon must be used within BeaconProvider');
  return ctx;
};
