# RusTI-84 Codebase Analysis Report

## Phase 1: Comprehensive Codebase Analysis

### Project Overview
  Valculator is an existing open-source (Apache license) monorepo-based Valheim resource calculator built with modern web technologies. The project uses a modular architecture with separate packages for different concerns. We've since renamed it to RusTI-84 (although some components are still referencing Valculator) and are adapting the UI for implementing a crop calculator for a farming game (Rusty's Retirement).

### Technical Stack Analysis

#### 1. **Monorepo Architecture**
- **Lerna**: Monorepo management with independent versioning
- **Yarn Workspaces**: Package management and dependency resolution
- **Package Structure**: 6 main packages with clear separation of concerns

#### 2. **Frontend Framework**
- **React 18.2.0**: Modern React with hooks and functional components
- **TypeScript 5.2.2**: Strong typing throughout the codebase
- **Vite 5.1.0**: Fast build tool with React plugin and DTS generation

#### 3. **UI Framework**
- **Material-UI (MUI) 5.15.4**: Comprehensive component library
- **Emotion**: CSS-in-JS styling solution
- **Custom Theme**: Extensible theming system with palette customization

#### 4. **State Management**
- **React Context API**: Centralized state management
- **Custom Hooks**: Reusable state logic
- **Reducer Pattern**: Predictable state updates for complex operations

#### 5. **Build & Development**
- **ESBuild**: Fast minification
- **TypeScript Compilation**: Strict type checking
- **Source Maps**: Development debugging support
- **Library Build**: ES module output for external consumption

### Architectural Patterns

#### 1. **Component Hierarchy**
```
Valculator (App)
├── ThemeProvider
├── ValculatorContextProvider
│ ├── ValculatorLayoutContextProvider
│ ├── ItemsDataContextProvider
│ ├── ChecklistDataContextProvider
│ └── ValculatorDataContextProvider
├── TabsMenu
└── ValculatorSections
├── TabSearch (Search & Filter)
├── TabSelection (Selected Items)
└── TabChecklist (Materials & Requirements)
```

#### 2. **Data Flow Architecture**
- **Unidirectional Flow**: Data flows down through props, actions flow up through callbacks
- **Context-Based State**: Shared state accessible throughout component tree
- **Reducer Pattern**: Complex state logic centralized in reducer functions
- **URL State Sync**: Search parameters synchronized with application state

#### 3. **Service Layer Structure**
- **Data Package**: Centralized data management and types
- **Helper Functions**: Utility functions for data processing
- **Context Providers**: Business logic encapsulation
- **Type Safety**: Comprehensive TypeScript interfaces

#### 4. **Error Handling Strategies**
- **Type Guards**: Runtime type checking
- **Optional Chaining**: Safe property access
- **Default Values**: Fallback for missing data
- **Validation**: Input validation through TypeScript

#### 5. **Performance Optimization Techniques**
- **React.memo**: Component memoization
- **useMemo**: Expensive calculation caching
- **useCallback**: Stable function references
- **Lazy Loading**: Conditional component rendering
- **Virtual Scrolling**: Large list performance (react-render-if-visible)

### Critical Components Documentation

#### 1. **Main Application Entry Points**
- **`packages/interface/src/App.tsx`**: Root component with theme and context providers
- **`packages/interface/src/main.ts`**: Library exports and entry point
- **`packages/context/src/Valculator.context.tsx`**: Main context provider composition

#### 2. **Core Calculator Logic Components**
- **`packages/context/src/ValculatorDataContext/checklist/convertSelectedItemsToRequired.helpers.ts`**: Core calculation logic
- **`packages/context/src/ValculatorDataContext/checklist/checklistData.helpers.ts`**: Checklist state management
- **`packages/context/src/ValculatorDataContext/items/itemsData.context.tsx`**: Item selection management

#### 3. **UI Component Library Usage**
- **Material-UI Components**: Tabs, Grid, Box, List components
- **Custom Components**: SectionContainer, ListContainer, SectionHeadContainer
- **Responsive Design**: Grid-based layout with breakpoint handling

#### 4. **State Management Modules**
- **Items State**: Selected items, owned items, quantities
- **Checklist State**: Required materials, collected items, stations needed
- **Layout State**: Tab management, fullscreen mode, responsive behavior

#### 5. **Data Models and Type Definitions**
- **`packages/data/src/data/@types/ValheimData.types.ts`**: Core item interface
- **`packages/data/src/data/@types/Materials.types.ts`**: Material definitions
- **`packages/context/src/ValculatorDataContext/*/types.ts`**: Context-specific types

#### 6. **Utility Functions and Helpers**
- **`packages/data/src/helpers/getItemId.ts`**: Item identification
- **`packages/context/src/helpers/useUrlFilters.tsx`**: URL state synchronization
- **`packages/context/src/helpers/useSearchParams.tsx`**: Search parameter management

### Valheim-Specific Code Identification

#### 1. **Game-Specific Data Structures**

##### **Item Interface (`IItem`)**
```typescript
interface IItem {
id: string;
group: GroupType; // Valheim-specific: armor, weapons, building, etc.
name: string; // Valheim item names
set: string; // Valheim set names (bronze, iron, etc.)
type: string; // Valheim type names (chest, helmet, etc.)
level?: number; // Valheim upgrade levels
materials: { [key in MaterialsType]?: number }; // Valheim materials
stats?: IStats; // Valheim-specific stats
effects?: IEffects; // Valheim-specific effects
station?: IStation; // Valheim crafting stations
crafts?: number; // Valheim crafting output
stacks?: number; // Valheim inventory stacking
}
```

##### **Material Types (`MaterialsType`)**
```typescript
enum MaterialsEnum {
"ancient bark", "black metal", "bronze", "copper", "iron",
"leather scraps", "deer hide", "troll hide", "wolf pelt",
"carrot", "turnip", "mushroom", "blueberries", "honey",
// ... 100+ Valheim-specific materials
}

```

##### **Group Types (`GroupType`)**
```typescript
type GroupType =
| "armor" | "building" | "weapons" | "recipes"
| "shields" | "tools" | "crafting" | "furniture" | "misc";
```

##### **Station Types (`StationType`)**
```typescript
interface IStation {
workbench?: number; // Valheim workbench levels
forge?: number; // Valheim forge levels
cauldron?: number; // Valheim cauldron levels
fermenter?: number; // Valheim fermenter levels
"Stone Oven"?: number; // Valheim-specific station
stonecutter?: number; // Valheim-specific station
"Artisan Table"?: number; // Valheim-specific station
hammer?: number; // Valheim hammer requirement
"black forge"?: number; // Valheim-specific station
"Galdr Table"?: number; // Valheim-specific station
}
```

#### 2. **Valheim-Specific Game Mechanics**

##### **Crafting System**
- **Material Requirements**: Complex material calculations with quantities
- **Station Dependencies**: Crafting station level requirements
- **Upgrade Paths**: Item level progression with increasing material costs
- **Recipe Dependencies**: Multi-step crafting chains

##### **Resource Management**
- **Material Collection**: Tracking collected vs. required materials
- **Inventory Management**: Owned items and quantities
- **Crafting Optimization**: Minimizing material waste

#### 3. **Domain-Specific Business Logic**

##### **Calculator Logic (`convertSelectedItemsToRequired.helpers.ts`)**
```typescript
// Valheim-specific material calculation
export const materialsReducer = (
acc: Array<ChecklistMaterialType>,
cur: SelectedItem
) => {
// Calculates total materials needed for crafting
// Handles Valheim's material quantity system
// Aggregates materials across multiple items
};

// Valheim-specific station requirement calculation
export const stationsReducer = (
acc: Array<ChecklistStationType>,
cur: SelectedItem
) => {
// Determines required crafting station levels
// Handles Valheim's station upgrade system
// Tracks maximum station level needed
};
```

##### **Checklist Management**
- **Material Tracking**: Uncollected vs. collected materials
- **Station Requirements**: Required crafting station levels
- **Upgrade Items**: Items needed for upgrades
- **Total Calculations**: Aggregate material requirements
  
#### 4. **Game Artwork/Assets Integration**
- **Image Package**: `packages/images/src/assets/item-images/`
- **Organized by Category**: armor, building, crafting, furniture, misc, recipes, shields, tools, weapons
- **PNG Format**: High-quality game asset images
- **Naming Convention**: Matches Valheim item names exactly

#### 5. **Valheim-Specific Terminology and UI Labels**
- **Tab Names**: "Search", "Selection", "Checklist"
- **Section Headers**: Material requirements, station requirements
- **Action Labels**: "Collect", "Remove Collected", "Reset Checklist"
- **Material Names**: All Valheim material names (ancient bark, black metal, etc.)

### Generic Calculator Functionality vs. Valheim-Specific Implementation

#### 1. **Generic Calculator Architecture (Preserve)**
- **Three-Tab Interface**: Search, Selection, Checklist pattern
- **Item Selection System**: Add/remove items with quantities
- **Material Calculation Engine**: Core algorithm for requirements
- **State Management**: Context-based state with reducers
- **URL Synchronization**: State persistence in URL parameters
- **Responsive Layout**: Grid-based responsive design
- **Theme System**: Extensible Material-UI theming

#### 2. **Valheim-Specific Implementation (Extract/Replace)**
- **Data Models**: `IItem`, `MaterialsType`, `GroupType`, `StationType`
- **Game Data**: All item definitions, material lists, recipes
- **Crafting Logic**: Station requirements, upgrade paths
- **Asset Integration**: Game images and artwork
- **Terminology**: Game-specific labels and naming

### Extraction Roadmap

#### **Phase 1: Data Model Extraction (Current)**
- ✅ Identify Valheim-specific data structures
- ✅ Document generic calculator architecture
- ✅ Plan extraction strategy

#### **Phase 2: Core Logic Extraction**
- Item (Crop) selection management
- Checklist state management
- URL synchronization logic

- Implement ICrop, IUnlockRequirement, IInventory, IOptimizationPlan, ICropPlan interfaces
- Convert spreadsheet data into parsable, importable format
- Download crop images from Rusty's Retirement fandom wiki

#### **Phase 3: Data Migration**
- **Implement Crop Planning Data**
- Implement ICrop, IUnlockRequirement, IInventory, IOptimizationPlan, ICropPlan interfaces
- Convert spreadsheet data into parsable, importable format
- Download crop images from Rusty's Retirement fandom wiki

- **Remove Valheim Data** (Let's actually keep all Valheim logic until the Rusty's Retirement UI is functional)
- Delete all game-specific data files
- Remove Valheim material definitions
- Extract game artwork
- Clean up Valheim-specific types
- Complete this after Phase 4 or 5

#### **Phase 4: UI Adaptation**
- Refactor UI according to crop calculator requirements
- < translate calculator requirements into actionable items here >

- **Adapt Components**
- Modify item cards for crop display
- Update filters for farming categories
- Adapt checklist for planting requirements
  
#### **Phase 5: Crop Planning Logic**
- **Implement Farming Algorithms**
- < insert crop calculator implementation step by step breakdown here >

### Key Separation Points

#### 1. **Data Layer Separation**
- **Generic**: Item selection, quantity management
- **Valheim-Specific**: Game items, materials, crafting stations, recipes

#### 2. **Business Logic Separation**
- **Generic**: Checklist management, state persistence, URL sync
- **Valheim-Specific**: Crafting requirements, station levels, upgrade paths

#### 3. **UI Component Separation**
- **Generic**: Layout components, state management, responsive design
- **Valheim-Specific**: Item displays, material lists, station requirements

#### 4. **Asset Separation**
- **Generic**: Component styling, theme system, layout assets
- **Valheim-Specific**: All game artwork, item images, material icons

### Recommendations for Extraction
#### 1. **Preserve Generic Architecture**
- The three-tab interface pattern will be retained for crop planning
- Context-based state management is well-suited for farming data
- URL synchronization is valuable for sharing plans

#### 2. **Extract Calculation Logic**
- The material aggregation algorithm is reusable for crop planning
- The checklist system can track planting requirements

#### 3. **Adapt Data Models**
- < Go into detail on the data model requirements for crop calculator here >

#### 4. **Maintain Performance Optimizations**
- Keep React.memo and useMemo patterns
- Preserve virtual scrolling for large crop lists
- Maintain responsive grid layout
- Keep efficient state updates

The key strengths that should be preserved include:
- **Modular monorepo structure** for maintainability
- **React Context-based state management** for complex data
- **Three-tab interface pattern** perfect for crop planning workflow
- **Material calculation engine** adaptable for farming requirements
- **URL state synchronization** for sharing plans
- **Responsive Material-UI design** for cross-device compatibility

The main areas requiring attention are:
- **Data model extraction** from Valheim-specific types
- **Calculation logic adaptation** for farming mechanics
- **UI terminology updates** for agricultural context
- **Asset replacement** with farming-related content
