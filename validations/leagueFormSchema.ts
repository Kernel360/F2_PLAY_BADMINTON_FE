import { z } from "zod";

const leagueFormSchema = z
  .object({
    mode: z.enum(["create", "update"]),
    league_name: z
      .string({
        required_error: "경기 이름을 입력해주세요",
      })
      .min(2, { message: "경기 이름은 최소 2글자 이상이어야 합니다." })
      .max(20, { message: "경기 이름은 최대 20글자 이하로 입력해주세요." }),
    description: z
      .string({
        required_error: "경기 설명을 입력해주세요",
      })
      .min(2, "경기 설명은 최소 2글자 이상이어야 합니다.")
      .max(1000, "경기 설명은 최대 1000글자 이하로 입력해주세요."),
    full_address: z
      .string({
        required_error: "경기 장소를 입력해주세요",
      })
      .min(2, "경기 장소는 최소 2글자 이상이어야 합니다.")
      .max(100, "경기 장소는 최대 100글자 이하로 입력해주세요."),
    tier_limit: z.enum(["BRONZE", "SILVER", "GOLD"], {
      required_error: "지원 가능한 티어를 선택해주세요.",
    }),
    match_type: z.enum(["SINGLES", "DOUBLES"], {
      required_error: "경기 타입을 선택해주세요.",
    }),
    league_at: z.string().optional(),
    recruiting_closed_at: z.string().optional(),
    player_limit_count: z
      .number({
        required_error: "참가 인원을 입력해주세요",
      })
      .int("참가 인원은 정수여야 합니다.")
      .min(2, "참가 인원은 2명 이상이여야 합니다.")
      .max(100, "참가 인원은 100명 이하여야 합니다."),
    match_generation_type: z.enum(["FREE", "TOURNAMENT"], {
      required_error: "대진표 타입을 선택해주세요.",
    }),
  })
  .superRefine((data, ctx) => {
    const {
      mode,
      player_limit_count,
      match_generation_type,
      match_type,
      league_at,
      recruiting_closed_at,
    } = data;

    // 수정 모드: league_at 및 recruiting_closed_at 검증 x
    if (mode === "update") {
      if (match_generation_type === "FREE" && match_type === "SINGLES") {
        if (player_limit_count < 2 || player_limit_count % 2 !== 0) {
          ctx.addIssue({
            code: "custom",
            path: ["player_limit_count"],
            message: "프리 단식은 참가 인원이 2 이상이고 짝수여야 합니다.",
          });
        }
      }

      if (match_generation_type === "FREE" && match_type === "DOUBLES") {
        if (player_limit_count < 4 || player_limit_count % 4 !== 0) {
          ctx.addIssue({
            code: "custom",
            path: ["player_limit_count"],
            message: "프리 복식은 참가 인원이 4 이상이고 4의 배수여야 합니다.",
          });
        }
      }

      if (match_generation_type === "TOURNAMENT" && match_type === "SINGLES") {
        if (player_limit_count < 2) {
          ctx.addIssue({
            code: "custom",
            path: ["player_limit_count"],
            message: "토너먼트 단식은 참가 인원이 2 이상이어야 합니다.",
          });
        }
      }

      if (match_generation_type === "TOURNAMENT" && match_type === "DOUBLES") {
        if (player_limit_count < 4 || player_limit_count % 2 !== 0) {
          ctx.addIssue({
            code: "custom",
            path: ["player_limit_count"],
            message: "토너먼트 복식은 참가 인원이 4 이상이고 짝수여야 합니다.",
          });
        }
      }

      return; // 수정 모드에서는 league_at, recruiting_closed_at 검증 생략
    }

    // 생성 모드: league_at 및 recruiting_closed_at 검증
    if (league_at && new Date(league_at) <= new Date()) {
      ctx.addIssue({
        code: "custom",
        path: ["league_at"],
        message: "경기 시작 날짜는 현재 시간보다 뒤에 설정되어야 합니다.",
      });
    }

    if (recruiting_closed_at && new Date(recruiting_closed_at) <= new Date()) {
      ctx.addIssue({
        code: "custom",
        path: ["recruiting_closed_at"],
        message: "모집 마감 날짜는 현재 시간보다 뒤에 설정되어야 합니다.",
      });
    }

    // 생성 모드: player_limit_count 검증
    if (match_generation_type === "FREE" && match_type === "SINGLES") {
      if (player_limit_count < 2 || player_limit_count % 2 !== 0) {
        ctx.addIssue({
          code: "custom",
          path: ["player_limit_count"],
          message: "프리 단식은 참가 인원이 2 이상이고 짝수여야 합니다.",
        });
      }
    }

    if (match_generation_type === "FREE" && match_type === "DOUBLES") {
      if (player_limit_count < 4 || player_limit_count % 4 !== 0) {
        ctx.addIssue({
          code: "custom",
          path: ["player_limit_count"],
          message: "프리 복식은 참가 인원이 4 이상이고 4의 배수여야 합니다.",
        });
      }
    }

    if (match_generation_type === "TOURNAMENT" && match_type === "SINGLES") {
      if (player_limit_count < 2) {
        ctx.addIssue({
          code: "custom",
          path: ["player_limit_count"],
          message: "토너먼트 단식은 참가 인원이 2 이상이어야 합니다.",
        });
      }
    }

    if (match_generation_type === "TOURNAMENT" && match_type === "DOUBLES") {
      if (player_limit_count < 4 || player_limit_count % 2 !== 0) {
        ctx.addIssue({
          code: "custom",
          path: ["player_limit_count"],
          message: "토너먼트 복식은 참가 인원이 4 이상이고 짝수여야 합니다.",
        });
      }
    }
  });

export default leagueFormSchema;
