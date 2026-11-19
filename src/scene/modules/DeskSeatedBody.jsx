import {seatedStudy} from '../assets/seatedStudy.js';
// Photo-guided transparent art; the complete source anatomy is retained.
// The selected character scale is applied about the seated hip anchor.
export function DeskSeatedBody(){
  return <svg className="desk-seated-anatomy" viewBox="0 0 1672 941" preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <clipPath id="desk-photo-waist-computer"><path d="M0 732H1380V620H1672V941H0Z"/></clipPath>
      <clipPath id="desk-photo-waist-writing"><path d="M0 738H1340Q1370 734 1380 728V620H1672V941H0Z"/></clipPath>
    </defs>
    {Object.entries(seatedStudy).map(([mode,art])=><g className={`desk-anatomy-${mode}`} key={mode} clipPath={`url(#desk-photo-waist-${mode})`}>
      <image href={art.file} {...art.bounds} preserveAspectRatio="none" />
    </g>)}
  </svg>;
}
