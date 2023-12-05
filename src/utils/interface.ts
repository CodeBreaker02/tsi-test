export interface MatchCardProps {
  matchDetails: {
    id: number;
    league: string;
    season: number;
    date: {
      start: string;
      end: string | null;
      duration: string | null;
    };
    stage: number;
    status: {
      clock: number | null;
      halftime: boolean;
      short: number;
      long: string;
    };
    periods: {
      current: number;
      total: number;
      endOfPeriod: boolean;
    };
    arena: {
      name: string;
      city: string;
      state: string;
      country: string | null;
    };
    teams: {
      visitors: {
        id: number;
        name: string;
        nickname: string;
        code: string;
        logo: string;
      };
      home: {
        id: number;
        name: string;
        nickname: string;
        code: string;
        logo: string;
      };
    };
    scores: {
      visitors: {
        win: number | null;
        loss: number | null;
        series: {
          win: number | null;
          loss: number | null;
        };
        linescore: number[];
        points: number | null;
      };
      home: {
        win: number | null;
        loss: number | null;
        series: {
          win: number | null;
          loss: number | null;
        };
        linescore: number[];
        points: number | null;
      };
    };
    officials: any[]; // Update with actual type if available
    timesTied: number | null;
    leadChanges: number | null;
    nugget: any;
  };
  onCardClick: () => void;
}

export interface Match {
  id: number;
  league: string;
  season: number;
  date: {
    start: string;
    end: string | null;
    duration: string | null;
  };
  stage: number;
  status: {
    clock: number | null;
    halftime: boolean;
    short: number;
    long: string;
  };
  periods: {
    current: number;
    total: number;
    endOfPeriod: boolean;
  };
  arena: {
    name: string;
    city: string;
    state: string;
    country: string | null;
  };
  teams: {
    visitors: {
      id: number;
      name: string;
      nickname: string;
      code: string;
      logo: string;
    };
    home: {
      id: number;
      name: string;
      nickname: string;
      code: string;
      logo: string;
    };
  };
  scores: {
    visitors: {
      win: number | null;
      loss: number | null;
      series: {
        win: number | null;
        loss: number | null;
      };
      linescore: number[];
      points: number | null;
    };
    home: {
      win: number | null;
      loss: number | null;
      series: {
        win: number | null;
        loss: number | null;
      };
      linescore: number[];
      points: number | null;
    };
  };
  officials: any[];
  timesTied: number | null;
  leadChanges: number | null;
  nugget: any | null;
}
