from fastapi import APIRouter, File, UploadFile, HTTPException, Depends
from app.services.text_extract_service import extract_text
from app.services.text_analyse_service import analyse_text
from app.schemas.contract_schema import analyseResponse
from app.utils.rate_limit import rate_checker
router = APIRouter()

MAX_FILE_SIZE = 3 * 1024 * 1024  # 3 MB


@router.post("/analyse",dependencies=[Depends(rate_checker)], response_model=analyseResponse)
async def analyse(file: UploadFile = File()):
    try:
        file.file.seek(0, 2)
        size = file.file.tell()
        file.file.seek(0)

        if size > MAX_FILE_SIZE:
            raise HTTPException(status_code=413, detail="File exceeds 3MB limit")

        data = await extract_text(file)
        analysis = await analyse_text(data)
        analysis["full_raw_doc"] = data

        return analysis

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
