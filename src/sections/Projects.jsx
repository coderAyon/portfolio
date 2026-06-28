import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Download, ExternalLink, Github, Share2, Sparkle, X } from "lucide-react";

import Reveal from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";
import { graphicsWorkTypes, projectCategories } from "../data/portfolio";

function ProjectVisual({ accent, index, project }) {
  const hasWebsitePreview = Boolean(project?.previewImage);
  const hasAppPreview = Boolean(project?.appPreviewImage);
  const floatingPanelClassName = "absolute left-7 top-8 h-28 w-28 rounded-[2rem] border border-white/14 bg-white/[0.09] shadow-aura";
  const floatingOrbClassName = "absolute bottom-7 right-8 h-36 w-36 rounded-full border border-white/12 bg-gradient-to-br from-white/16 to-white/[0.03]";

  return (
    <div className={`project-visual ${hasWebsitePreview ? "project-visual-website" : ""} ${hasAppPreview ? "project-visual-app" : ""}`}>
      <div className={`project-visual-glow absolute inset-x-8 top-8 h-28 rounded-full bg-gradient-to-r ${accent} opacity-60 blur-3xl`} />
      {project?.header && !hasWebsitePreview && !hasAppPreview ? (
        <div className="project-visual-header">
          <span>{project.status}</span>
          <strong>{project.header}</strong>
          <p>{project.title}</p>
        </div>
      ) : null}
      {hasWebsitePreview ? (
        <div className="project-browser-frame">
          <div className="project-browser-toolbar" aria-hidden="true">
            <span />
            <span />
            <span />
            <p>Live LMS preview</p>
          </div>
          <img src={project.previewImage} alt={`${project.title} website preview`} loading="lazy" decoding="async" />
        </div>
      ) : null}
      {hasAppPreview ? (
        <div className="project-app-preview-frame">
          <img
            src={project.appPreviewImage}
            alt={`${project.title} app preview`}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            fetchpriority={index === 0 ? "high" : "low"}
            sizes="(min-width: 1024px) 31vw, (min-width: 768px) 48vw, 92vw"
          />
        </div>
      ) : null}
      {!hasWebsitePreview && !hasAppPreview ? (
        <>
          <div className={floatingPanelClassName} />
          <div className={floatingOrbClassName} />
          <div className="absolute inset-x-10 bottom-10 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/12" />
          <Sparkle className="absolute right-12 top-12 h-6 w-6 text-frost/70" />
        </>
      ) : null}
    </div>
  );
}

function ProjectDetailsModal({ project, onClose }) {
  const hasPreview = Boolean(project?.previewImage);

  useEffect(() => {
    if (!project) return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project || typeof document === "undefined") return null;

  const modal = (
    <motion.div
      className="project-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.16 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
    >
      <button className="project-modal-backdrop" type="button" aria-label="Close project details" onClick={onClose} />
      <motion.article
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="project-modal-panel"
      >
        <button className="project-modal-close" type="button" onClick={onClose} aria-label="Close project details">
          <X className="h-5 w-5" />
        </button>
        {!hasPreview ? (
          <div className="project-modal-preview">
            <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-42 blur-3xl`} />
            <div className="project-modal-preview-caption">
              <p>{project.type}</p>
              <h3>{project.header ?? project.title}</h3>
              <span>{project.title}</span>
            </div>
          </div>
        ) : null}
        <div className="project-modal-content">
          <p className="text-xs font-bold uppercase tracking-[0.36em] text-violet-aura">{project.status ?? "Project Details"}</p>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-frost sm:text-5xl">{project.title}</h2>
          <p className="mt-5 text-base leading-8 text-white/66">{project.description ?? project.text}</p>
          {project.details?.length ? (
            <ul className="project-detail-list">
              {project.details.map((detail) => (
                <li key={detail}>
                  <Sparkle className="h-4 w-4" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          ) : null}
          <div className="project-modal-actions">
            {project.liveUrl ? (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="project-primary-link">
                View Live
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : null}
          </div>
        </div>
      </motion.article>
    </motion.div>
  );

  return createPortal(modal, document.body);
}

function GraphicsSamples() {
  const [activeGraphicsId, setActiveGraphicsId] = useState(graphicsWorkTypes[0].id);
  const activeGraphics = graphicsWorkTypes.find((category) => category.id === activeGraphicsId) ?? graphicsWorkTypes[0];
  const eagerSampleLimit = 1;

  return (
    <div className="mt-12">
      <Reveal className="mx-auto max-w-4xl">
        <div className="graphics-subtabs" role="tablist" aria-label="Graphics design categories">
          {graphicsWorkTypes.map((category) => {
            const active = category.id === activeGraphics.id;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={active}
                className={`graphics-subtab ${active ? "graphics-subtab-active" : ""}`}
                onClick={() => setActiveGraphicsId(category.id)}
              >
                {category.label}
              </button>
            );
          })}
        </div>
        <p className="mx-auto mt-5 max-w-2xl text-center text-sm font-semibold leading-7 text-white/58">
          {activeGraphics.summary}
        </p>
      </Reveal>

      <div key={activeGraphics.id} className="graphics-sample-grid mt-12">
        {activeGraphics.samples.map((sample, index) => (
          <article
            key={sample.id}
            className="graphics-sample-card"
            style={{ "--sample-delay": `${Math.min(index, 8) * 18}ms` }}
            tabIndex={0}
          >
            <div
              className={`graphics-sample-preview ${
                sample.image
                  ? `graphics-sample-preview-image ${sample.orientation === "portrait" ? "graphics-sample-preview-portrait" : ""}`
                  : `bg-gradient-to-br ${activeGraphics.accent}`
              }`}
            >
              {sample.image ? (
                <img
                  src={sample.image}
                  alt={sample.title}
                  loading={index < eagerSampleLimit ? "eager" : "lazy"}
                  decoding="async"
                  fetchpriority={index < eagerSampleLimit ? "high" : "low"}
                  sizes="(min-width: 1024px) 31vw, (min-width: 768px) 48vw, 92vw"
                />
              ) : (
                <>
                  <div className="graphics-sample-orbit" />
                  <div className="graphics-sample-orbit graphics-sample-orbit-two" />
                  <span>{sample.number}</span>
                </>
              )}
            </div>
            <div className="graphics-sample-meta">
              <p>{sample.label}</p>
              <h3>{sample.title}</h3>
              <span>{sample.note}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, index, onSelect }) {
  const isDownloadableApp = Boolean(project.apkUrl);
  const [copiedLiveUrl, setCopiedLiveUrl] = useState(false);
  const copyTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const handleCopyLiveUrl = async () => {
    if (!project.liveUrl) return;

    let copied = false;
    const textarea = document.createElement("textarea");
    textarea.value = project.liveUrl;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.top = "-9999px";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
      copied = document.execCommand("copy");
    } catch {
      copied = false;
    } finally {
      document.body.removeChild(textarea);
    }

    if (!copied && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(project.liveUrl);
        copied = true;
      } catch {
        copied = false;
      }
    }

    setCopiedLiveUrl(true);

    if (copyTimerRef.current) {
      window.clearTimeout(copyTimerRef.current);
    }

    copyTimerRef.current = window.setTimeout(() => {
      setCopiedLiveUrl(false);
      copyTimerRef.current = null;
    }, copied ? 1600 : 2200);
  };

  return (
    <article className={`project-card ${isDownloadableApp ? "project-app-card" : ""}`}>
      <ProjectVisual accent={project.accent} index={index} project={project} />
      <div className={`p-6 ${isDownloadableApp ? "project-app-content" : ""}`}>
        {isDownloadableApp ? (
          <>
            <p className="project-app-type">{project.type}</p>
            <h3 className="project-app-title">{project.title}</h3>
            <p className="project-app-copy">{project.text}</p>
            <div className="project-app-action-row">
              <div className="project-app-size">
                <span>APK Size</span>
                <strong>{project.apkSize}</strong>
              </div>
              <a href={project.apkUrl} download className="project-mini-button project-download-button">
                Download now
                <Download className="h-4 w-4" />
              </a>
            </div>
          </>
        ) : (
          <>
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-violet-aura">{project.type}</p>
            <h3 className="mt-4 font-display text-2xl font-bold text-frost">{project.title}</h3>
            <p className="mt-4 leading-7 text-white/58">{project.text}</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button type="button" className="project-mini-button" onClick={() => onSelect(project)}>
                View Details
                <ArrowUpRight className="h-4 w-4" />
              </button>
              {project.repoUrl ? (
                <a href={project.repoUrl} target="_blank" rel="noreferrer" className="project-icon-link" aria-label={`${project.title} GitHub repo`}>
                  <Github className="h-4 w-4" />
                </a>
              ) : null}
              {project.liveUrl ? (
                <button
                  type="button"
                  className={`project-icon-link ${copiedLiveUrl ? "project-icon-link-copied" : ""}`}
                  aria-label={copiedLiveUrl ? `${project.title} link copied` : `Copy ${project.title} live link`}
                  title={copiedLiveUrl ? "Link copied" : "Copy link"}
                  onClick={handleCopyLiveUrl}
                >
                  <Share2 className="h-4 w-4" />
                </button>
              ) : null}
            </div>
          </>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  const [activeCategoryId, setActiveCategoryId] = useState(projectCategories[0].id);
  const [selectedProject, setSelectedProject] = useState(null);
  const activeCategory = projectCategories.find((category) => category.id === activeCategoryId) ?? projectCategories[0];

  return (
    <section id="projects" className="section-wrap projects-section">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <SectionLabel
          eyebrow="Featured Projects"
          title="A showcase built for future design images, case studies, and client outcomes."
          copy="The cards are intentionally visual-first, so your upcoming design screenshots can replace the abstract placeholders without changing the layout."
        />
        <Reveal delay={0.08} className="mx-auto mt-12 max-w-5xl">
          <div className="project-tabs" role="tablist" aria-label="Project categories">
            {projectCategories.map((category) => {
              const Icon = category.icon;
              const active = category.id === activeCategory.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  className={`project-tab ${active ? "project-tab-active" : ""}`}
                  onClick={() => setActiveCategoryId(category.id)}
                >
                  <Icon className="h-4 w-4" />
                  <span>{category.label}</span>
                </button>
              );
            })}
          </div>
          <p className="mx-auto mt-5 max-w-2xl text-center text-sm font-semibold leading-7 text-white/58">
            {activeCategory.summary}
          </p>
        </Reveal>
        {activeCategory.id === "graphics" ? (
          <GraphicsSamples />
        ) : (
          <div key={activeCategory.id} className="mt-14 grid gap-6 lg:grid-cols-3">
            {activeCategory.projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} onSelect={setSelectedProject} />
            ))}
          </div>
        )}
        <AnimatePresence>
          {selectedProject ? <ProjectDetailsModal project={selectedProject} onClose={() => setSelectedProject(null)} /> : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
