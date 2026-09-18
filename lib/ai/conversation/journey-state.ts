/**
 * Journey State Store & Helper Functions
 * Tracks conversation progress, fills slots, and manages state persistence.
 */

import { JourneyState, JourneyGoal, JourneySlots } from "./journey-types";
import { JOURNEY_FLOWS } from "./journey-flows";

const JOURNEY_STORE = new Map<string, JourneyState>();

export const JourneyStateManager = {
  /**
   * Initializes or retrieves existing journey state for a conversation
   */
  getOrCreate(conversationId: string): JourneyState {
    const existing = JOURNEY_STORE.get(conversationId);
    if (existing) {
      return existing;
    }

    const newState: JourneyState = {
      conversationId,
      flow: "start",
      currentStep: "STEP_START",
      recommendationReady: false,
      progress: 10,
      updatedAt: Date.now(),
    };

    JOURNEY_STORE.set(conversationId, newState);
    return newState;
  },

  /**
   * Saves updated journey state
   */
  save(state: JourneyState): void {
    state.updatedAt = Date.now();
    this.calculateProgress(state);
    JOURNEY_STORE.set(state.conversationId, state);
  },

  /**
   * Calculates completion progress percentage (0 - 100)
   */
  calculateProgress(state: JourneyState): void {
    if (!state.goal) {
      state.progress = 10;
      return;
    }

    const flowDef = JOURNEY_FLOWS[state.goal];
    if (!flowDef) {
      state.progress = 20;
      return;
    }

    const required = flowDef.requiredSlots;
    let filledCount = 0;
    for (const slot of required) {
      const val = state[slot];
      if (val !== undefined && val !== null && val !== "") {
        filledCount++;
      }
    }

    // Base 20% for goal chosen, remaining 80% distributed among required slots
    const pct = Math.round(20 + (filledCount / required.length) * 80);
    state.progress = Math.min(100, Math.max(20, pct));
    if (filledCount === required.length) {
      state.recommendationReady = true;
      state.progress = 100;
    }
  },

  /**
   * Resets journey state for conversation without deleting account or user history
   */
  resetJourney(conversationId: string): JourneyState {
    const freshState: JourneyState = {
      conversationId,
      flow: "start",
      currentStep: "STEP_START",
      recommendationReady: false,
      progress: 10,
      updatedAt: Date.now(),
    };
    JOURNEY_STORE.set(conversationId, freshState);
    return freshState;
  },

  /**
   * Handles user switching goal mid-conversation (e.g. MOS -> Practical Excel)
   * Cleans incompatible slots while preserving compatible ones (like currentLevel, studyTimePerWeek)
   */
  switchGoal(state: JourneyState, newGoal: JourneyGoal): void {
    state.goal = newGoal;
    state.flow = newGoal;

    // Preserve level and time if compatible
    const preservedLevel = state.currentLevel;
    const preservedTime = state.studyTimePerWeek;

    // Reset flow-specific slots
    delete state.targetSubject;
    delete state.ic3Experience;
    delete state.ic3Scope;
    delete state.occupationOrNeed;
    delete state.requiredSkills;
    delete state.targetDate;

    state.currentLevel = preservedLevel;
    state.studyTimePerWeek = preservedTime;
    state.recommendationReady = false;

    this.calculateProgress(state);
  },

  /**
   * Updates state with newly extracted slots
   */
  applySlots(state: JourneyState, newSlots: Partial<JourneySlots>): void {
    if (newSlots.goal && newSlots.goal !== state.goal) {
      this.switchGoal(state, newSlots.goal);
    }

    for (const [key, value] of Object.entries(newSlots)) {
      if (value !== undefined && value !== null && value !== "" && key !== "goal") {
        (state as unknown as Record<string, unknown>)[key] = value;
      }
    }

    this.calculateProgress(state);
  },
};
